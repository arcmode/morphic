<div class="abstract">
Boilerplate code is an underrated problem: one-time chunks of non-reusable code and other necessary evils that are usually
abstracted away as a mixture of scaffolding, library code and configuration are cheap to buy but can come as very
expensive to replace later on. There is accidental complexity in most if not all boilerplate code around any *main* function or any source
code module that depends on a library or framework. This document describes a generalization of the *serverless* pattern and describes it as
the *frameless* pattern. The generalization is driven by the application of *separation of concerns* between module and system domains.
The PoC project in TypeScript introduces a *RESTful* module/system contracts with zero boilerplate and zero dependency on frameworks in the
modules source code.
Additionally, it is discussed how this pattern can facilitate evolution and co-evolution of product and platform streams of work within the dynamics
of the agile organization model.

</div>


# Table of Contents

1.  [TL;DR;](#orga69b66b)
    1.  [Frameless signature](#orgd116527)
2.  [Why modeling modularity matters](#org518a576)
    1.  [Separation of concerns](#orgf55d2cf)
    2.  [Evolvability](#org3f3c9d3)
    3.  [Consistency](#org6504d1f)
    4.  [Cycle time](#org0ef28b9)
3.  [How](#org787c5b5)
    1.  [MVP: Basic module systems](#orga0db4cd)
    2.  [Vision for v1.0](#org86dd5df)
4.  [Wishlist](#org11f145e)


<a id="orga69b66b"></a>

# TL;DR;

A frameless pattern is the result of applying separation of concerns between modular functionality and boilerplate code.
It replaces API dependency code and any boilerplate by leveraging contracts that task the platform to provide development and
production scripts to test, run, debug, deploy, package, build or any arbitrary task.


<a id="orgd116527"></a>

## Frameless signature

-   Zero boilerplate
-   Zero module dependency on platform API

The frameless pattern is a generalization of the *serverless* or *function-as-a-service* pattern.


<a id="org518a576"></a>

# Why modeling modularity matters


<a id="orgf55d2cf"></a>

## Separation of concerns

Most projects grow in a modular pace, adding new features incrementally to do the work that is required.
Also, most projects work on top of a given platform, *composed* by the set of languages, frameworks and libraries that together provide at least
one and sometimes several modularity models from which most projects pick one for each kind of module (job, route, library, DOM component, cli, etc).
By defining module models a separation between module concerns and system concerns is enforced by design.


<a id="org3f3c9d3"></a>

## Evolvability

In modular software, any code-editing required to *migrate* a given module into a different *framework* can be considered evitable
and patterns that add work to that task can be considered anti-patterns.
Having a module model decouples product features from platform (see previous point about separation of concerns and modularity). Being able to
work on platform features without blocking product stories is highly desirable. Collaboration in parallel is facilitated by the module contract serving
as reference for both sides.


<a id="org6504d1f"></a>

## Consistency

Most web projects require significant boilerplate code in order to run production applications. One of the most obvios properties 
of modular systems is the bigger number of running programs. The combination of modularity with patterns and tools that increase
boilerplate code creates a space for inconsistency that affects modular systems as they adopt new features and behavior not
yet defined within the "boilerplate-free" area of library and framework code.


<a id="org0ef28b9"></a>

## Cycle time

Short and predictable cycle times are an important contributing factor to the success of agile teams. During development, having a defined modularity model
makes the work in solutions space more predictable. Also, a minimal contract reduces the amount of glue-code which makes modules leaner.
If adopting new technology involves touching the internal modules of a project then innovation faces resistance as it can easily disrupt agile workflows.


<a id="org787c5b5"></a>

# How


### Modularity Model

Let's pretend we are going to start a new project. Instead of going through the usual ritual of:

1.  Select framework and libraries
2.  Write some boilerplate code
3.  Implement a set of modules following the modularity model from framework

Let's try the frameless approach:

1.  Define modularity model via a *platform* function: `platform : modules -> features`
2.  Implement the platform function as a thin wrapper that can include a module as part of predefined boilerplate
3.  Define boilerplate according to *your* platform
4.  Implement set of modules following *your* modularity model

Let's imagine for example a common kind of project for "web" projects: Rest API in NodeJS.

Let's define our *Rest module* model in TypeScript trying to achieve the *minimum viable interface*
required to know what the module *does* in the context of the specific project (Rest API).

A Rest module must define a url and method.

    export const url = '/hello-rest/:name'
    export const method = 'GET'

Also, it must define a *schema*.

    export const schema = {
        response: {
            200: {
                type: 'object',
                properties: {
                    greetings: {
                        type: 'string'
                    }
                }
            },
            500: {
                type: 'object',
                properties: {
                    errors: {
                        type: 'array',
                        items: {
                            type: 'string'
                        }
                    }
                }
            }
        }
    }

And finally a *handler* that is to be invoked with requests and expected to return responses.

    export const handler = async (req: Request): Promise<Result> => {
        try {
            return {
                status: 200,
                body: {
                    greetings: `Hello ${name}`
                }
            }
        } catch (err) {
            return {
                status: 500,
                body: {
                    errors: [err.message]
                }
            }
        }
    }

Note how the auxiliary types *Request* and *Response* are not exported or imported which means
zero source-code dependency with platform API's. The request/response model follows the HTTP
protocol. HTTP is a stable and standard family of specs and is in the guts of every Rest service.

    type Request = {
        params: {
            name: string
        }
    }
    
    type Result = {
        status: 200,
        body: {
            greetings: string
        }
    } | {
        status: 500,
        body: {
            errors: string[]
        }
    }

Then, the *minimum viable interface* for our newly born Rest module can be defined as

    type RestMod<
        Query,
        Params,
        Headers,
        Body,
        Config extends string,
        Result,
    > = {
        url: string,
        method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
        schema: RouteSchema<object>,
        config?: Record<Config, string | undefined>,
        handler: (
            req: RestRequest<Query, Params, Headers, Body>,
            cfg: Record<Config, string>
        ) => Promise<Result>
    };

The complete implementation can be found in the following git [repository](https://github.com/drojas/morphic/blob/master/modules/rest/lib/morphic-rest.ts).

Now let's solve the boilerplate from the requirements we know given the module type definition. The first
chunk has to be about importing dependencies. In this case the implementation is based on a function that
takes a Rest module and returns a *fastify* plugin and the corresponding boilerplate code required to put them
to work.

    import fastify from 'fastify';
    import { createFastifyPlugin } from '@frameless/rest';
    import config from 'config';

After the framework and libraries are imported let's import the actual Rest modules (one for this example)

    //
    // import rest modules
    //
    import * as morphicExamplesHelloRest from '@frameless-examples/hello-rest';

Let's just borrow a fastify server for this example.

    
    const instance = fastify({
        logger: true
    });

Now we need to add the routes from all modules to the server.

    //
    // add base plugins for initialization
    //
    
    //
    // add rest modules to the service
    //
    instance.register(createFastifyPlugin(morphicExamplesHelloRest, config));

And let's finalize the boilerplate with the usual port configuration and server initialization.

    const PORT = config.has('PORT')
        ? parseInt(config.get('PORT'), 10)
        : 0;
    
    instance.listen(PORT, (err: Error, address: string) => {
        if (err) {
            throw err;
        }
        instance.log.info(`server listening on ${address}`);
    });

This pattern allows your to provide *features as a service* implemented as a (platform) function of your modules.
The platform can provide by proxy any framework or library-like functionality including configurations, dependencies, scripts, etc.
This contributes to continuous improvement and agile goals because it means new developments on the platform can automatically be leveraged
by individual modules and teams without having to make code changes to each module.

Following, a couple of tech-oriented definitions for modularity from: <https://en.wikipedia.org/wiki/Modularity>

> In modular programming, modularity refers to the compartmentalization and interrelation of the parts of a software package.  
> 
> In software design, modularity refers to a logical partitioning of the "software design" that allows complex software to be manageable
> for the purpose of implementation and maintenance. The logic of partitioning may be based on related functions, implementation
> considerations, data links, or other criteria.

One interesting aspect of the last definition is the idea the relationship between complexity and software being manageable is
and worth paying close attention to and perhaps explore with "biomimicry lenses".

Let's compare the previous definitions with a biological one from: <https://en.wikipedia.org/wiki/Modularity_(biology)>

> Modularity refers to the ability of a system to organize discrete, individual units that can overall increase the efficiency of network
> activity and, in a biological sense, facilitates selective forces upon the network. Modularity is observed in all model systems, and can
> be studied at nearly every scale of biological organization, from molecular interactions all the way up to the whole organism.

The ideas behind "to be manageable" from the tech-oriented definition and of "selective forces" from the biological one seem aligned with
the "shortest path" mentality of both nature and the agile movement within the tech industry.

Modular development pairs naturally with agile or any other paced or sprint oriented methodologies.


<a id="orga0db4cd"></a>

## TODO MVP: Basic module systems

The documentation for this implementation, including examples can be located [here](./docs/index.html).

-   DONE RPC

    -   DONE hygen rpc-mod new &#x2013;in examples &#x2013;name hello-rpc
    
    -   DONE hygen rpc-api new &#x2013;in examples &#x2013;name rpc-simple

-   DONE REST

    -   DONE hygen rest-mod new &#x2013;in examples &#x2013;name hello-rest
    
    -   DONE hygen rest-api new &#x2013;in examples &#x2013;name rest-simple

-   TODO Job

-   TODO Cronjob

-   TODO Worker (Queue consumer)

-   TODO Events producer

-   TODO Events consumer

-   TODO Database app example (MongoDB)

-   TODO Instrumentation

-   TODO Standarize: Bring your own framework

-   TODO Client codegen


<a id="org86dd5df"></a>

## Vision for v1.0

More systems and module models

-   TODO Frontend components

-   TODO ETL processes

-   TODO Stream processing

-   TODO Deployment codegen


<a id="org11f145e"></a>

# Wishlist

-   HATEOAS
-   GraphQL
-   Auto partitioning
-   NPM Tarball Functor as a Service
