import { ScmIntegrationRegistry } from "@backstage/integration";
/**
 * Creates an `ado:repo:pr` Scaffolder action.
 *
 * @remarks
 *
 * This Scaffolder action will create a PR to a repository in Azure DevOps.
 *
 * @public
 */
export declare const pullRequestAzureRepoAction: (options: {
    integrations: ScmIntegrationRegistry;
}) => import("@backstage/plugin-scaffolder-node").TemplateAction<{
    organization?: string | undefined;
    sourceBranch?: string | undefined;
    targetBranch?: string | undefined;
    title: string;
    repoId: string;
    project?: string | undefined;
    supportsIterations?: boolean | undefined;
    server: string;
    token?: string | undefined;
}, import("@backstage/types").JsonObject>;
