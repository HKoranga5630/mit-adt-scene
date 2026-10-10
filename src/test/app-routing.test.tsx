import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it.each(["/", "/clubs", "/events", "/login", "/signup", "/student-login", "/home", "/admin-login", "/student/attendance", "/student/certificates", "/club/attendance", "/club/certificates", "/club/notifications", "/admin/attendance", "/admin/certificates", "/admin/notifications"])("matches a content page for %s", (path) => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes(path);

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
    expect(matches.at(-1)?.pathname).toBe(path);
  });
});
