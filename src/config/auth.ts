import type { SignOptions } from "jsonwebtoken";

export default {
    jwt:{
        secret: "default",
        expirenIn: "1d"
    }
} as AuthConfig;

type AuthConfig = {
    jwt: {
        secret: string;
        expirenIn: NonNullable<SignOptions["expiresIn"]>;
    }
};