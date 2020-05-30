export const response = (ctx, status = 200, body) => {
  ctx.response.status = status;
  ctx.response.body = body;
};

export const ok = (ctx, body) => {
  response(ctx, 200, body);
};

export const noContent = (ctx, body) => {
  response(ctx, 204, body);
};

export const notFound = (ctx, body) => {
  response(ctx, 404, body);
};
