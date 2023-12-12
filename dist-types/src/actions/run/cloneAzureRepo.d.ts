import { ScmIntegrationRegistry } from "@backstage/integration";
export declare const cloneAzureRepoAction: (options: {
    integrations: ScmIntegrationRegistry;
}) => import("@backstage/plugin-scaffolder-node").TemplateAction<{
    organization: string;
    remoteUrl: string;
    branch?: string | undefined;
    targetPath?: string | undefined;
    server: string;
    token?: string | undefined;
}, import("@backstage/types").JsonObject>;
