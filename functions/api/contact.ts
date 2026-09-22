import {
  handleContactRequest,
  type ContactEnv,
} from "../../src/lib/contactServer.ts";

export type ContactPagesContext = {
  request: Request;
  env: ContactEnv;
};

function forwardContactRequest(context: ContactPagesContext) {
  return handleContactRequest(context.request, { env: context.env });
}

export const onRequestPost = forwardContactRequest;
export const onRequest = forwardContactRequest;
