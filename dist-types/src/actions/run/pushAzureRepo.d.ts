import { Config } from "@backstage/config";
import { ScmIntegrationRegistry } from "@backstage/integration";
export declare const pushAzureRepoAction: (options: {
    integrations: ScmIntegrationRegistry;
    config: Config;
}) => import("@backstage/plugin-scaffolder-node").TemplateAction<{
    organization?: string | undefined;
    branch?: string | undefined;
    sourcePath?: string | undefined;
    gitCommitMessage?: string | undefined;
    gitAuthorName?: string | undefined;
    gitAuthorEmail?: string | undefined;
    server: string;
    token?: string | undefined;
}, import("@backstage/types").JsonObject>;
