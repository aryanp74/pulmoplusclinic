export function json(data: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...(init.headers || {})
    }
  });
}

export function methodNotAllowed(allowed: string[]) {
  return json(
    { ok: false, error: "Method not allowed." },
    { status: 405, headers: { Allow: allowed.join(", ") } }
  );
}
