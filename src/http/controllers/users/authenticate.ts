import { InvalidCredentialErrors } from "@/use-cases/errors/invalid-credentials-error";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase();
    const { user } = await authenticateUseCase.execute({
      email,
      password,
    });

    const accessToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      },
    );
    return reply.status(200).send({ accessToken });
  } catch (error) {
    if (error instanceof InvalidCredentialErrors) {
      return reply.status(400).send({ message: error.message });
    }

    throw error;
  }
}
