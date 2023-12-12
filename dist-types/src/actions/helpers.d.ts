import { Logger } from "winston";
import * as GitInterfaces from "azure-devops-node-api/interfaces/GitInterfaces";
import { IRequestHandler } from "azure-devops-node-api/interfaces/common/VsoBaseInterfaces";
export declare function cloneRepo({ dir, auth, logger, remote, remoteUrl, branch, }: {
    dir: string;
    auth: {
        username: string;
        password: string;
    } | {
        token: string;
    };
    logger: Logger;
    remote?: string;
    remoteUrl: string;
    branch?: string;
}): Promise<void>;
export declare function commitAndPushBranch({ dir, auth, logger, remote, commitMessage, gitAuthorInfo, branch, }: {
    dir: string;
    auth: {
        username: string;
        password: string;
    } | {
        token: string;
    };
    logger: Logger;
    remote?: string;
    commitMessage: string;
    gitAuthorInfo?: {
        name?: string;
        email?: string;
    };
    branch?: string;
}): Promise<void>;
export declare function createADOPullRequest({ gitPullRequestToCreate, url, authHandler, repoId, project, supportsIterations, }: {
    gitPullRequestToCreate: GitInterfaces.GitPullRequest;
    url: string;
    authHandler: IRequestHandler;
    repoId: string;
    project?: string;
    supportsIterations?: boolean;
}): Promise<void>;
