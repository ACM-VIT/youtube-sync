import { Response, response } from 'express';

enum StatusCode {
    SUCCESS = '10000',
    FAILURE = '10001',
    RETRY = '10002',
    INVALID_ACCESS_TOKEN = '10003'
}

enum ResponseStatus {
    SUCCESS = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_ERROR = 500
}

abstract class ApiResponse {
    constructor(
        protected status: StatusCode,
        protected statusCode: ResponseStatus,
        protected message: string
    ) { }

    protected prepare<T extends ApiResponse>(res: Response, response: T): Response {
        return res.status(this.statusCode).json(ApiResponse.sanitize(response));
    }

    public send(res: Response): Response {
        return this.prepare(res, this);
    }

    private static sanitize<T extends ApiResponse>(response: T): T {
        let clone = {} as T;
        Object.assign(clone, response);
        for (const i in clone) if (typeof clone[i] === 'undefined') delete clone[i];
        return clone;
    }
}

export class SucessMsgResponse extends ApiResponse {
    constructor(message: string) {
        super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
    }
}

export class SuccessResponse<T> extends ApiResponse {
    constructor(message: string, private data: T) {
        super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
    }

    send(res: Response): Response {
        return this.prepare<SuccessResponse<T>>(res, this);
    }
}

export class FailureMsgResponse extends ApiResponse {
    constructor(message: string) {
        super(StatusCode.FAILURE, ResponseStatus.SUCCESS, message);
    }
}

export class AuthFailureResponse extends ApiResponse {
    constructor(message = 'Authentication Failure') {
        super(StatusCode.FAILURE, ResponseStatus.UNAUTHORIZED, message);
    }
}

export class InternalErrorResponse extends ApiResponse {
    constructor(message = 'Internal Error Occured') {
        super(StatusCode.FAILURE, ResponseStatus.INTERNAL_ERROR, message);
    }
}

export class NotFoundResponse extends ApiResponse {
    protected url: string;

    constructor(message = 'NotFound') {
        super(StatusCode.FAILURE, ResponseStatus.NOT_FOUND, message);
        this.url = '';
    }

    send(res: Response): Response {
        //@ts-ignore
        this.url = res.req.originalUrl;
        return this.prepare<NotFoundResponse>(res, this);
    }
}

export class ForbiddenResponse extends ApiResponse {
    constructor(message = 'Forbidden') {
        super(StatusCode.FAILURE, ResponseStatus.FORBIDDEN, message);
    }
}

export class BadRequestResponse extends ApiResponse {
    constructor(message = "Bad Request") {
        super(StatusCode.FAILURE, ResponseStatus.BAD_REQUEST, message);
    }
}

export class AccessTokenErrorResponse extends ApiResponse {
    private instruction = 'refresh_token';

    constructor(message = 'invalid access_token') {
        super(StatusCode.INVALID_ACCESS_TOKEN, ResponseStatus.UNAUTHORIZED, message);
    }

    super(res: Response): Response {
        res.setHeader('instruction', this.instruction);
        return this.prepare<AccessTokenErrorResponse>(res, this);
    }
}

export class TokenRefreshResponse extends ApiResponse {
    constructor(message: string, private access_token: string, private refresh_token: string) {
        super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
    }

    send(res: Response): Response {
        return this.prepare(res, this);
    }
}
