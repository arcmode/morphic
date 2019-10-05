---
to: <%=locals.in%>/<%=name%>/lib/<%=name%>.ts
unless_exists: true
---
export const <%= h.changeCase.camel(name) %> = async (name: string): Promise<string> => {
    return `hello ${name}`;
}