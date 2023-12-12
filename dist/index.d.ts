import * as _backstage_plugin_scaffolder_node from '@backstage/plugin-scaffolder-node';
import * as _backstage_types from '@backstage/types';
import { ScmIntegrationRegistry } from '@backstage/integration';
import { Config } from '@backstage/config';

declare const cloneAzureRepoAction: (options: {
    integrations: ScmIntegrationRegistry;
}) => _backstage_plugin_scaffolder_node.TemplateAction<{
    organization: string;
    remoteUrl: string;
    branch?: string | undefined;
    targetPath?: string | undefined;
    server: string;
    token?: string | undefined;
}, _backstage_types.JsonObject>;

declare const pushAzureRepoAction: (options: {
    integrations: ScmIntegrationRegistry;
    config: Config;
}) => _backstage_plugin_scaffolder_node.TemplateAction<{
    organization?: string | undefined;
    branch?: string | undefined;
    sourcePath?: string | undefined;
    gitCommitMessage?: string | undefined;
    gitAuthorName?: string | undefined;
    gitAuthorEmail?: string | undefined;
    server: string;
    token?: string | undefined;
}, _backstage_types.JsonObject>;

/**
 * Creates an `ado:repo:pr` Scaffolder action.
 *
 * @remarks
 *
 * This Scaffolder action will create a PR to a repository in Azure DevOps.
 *
 * @public
 */
declare const pullRequestAzureRepoAction: (options: {
    integrations: ScmIntegrationRegistry;
}) => _backstage_plugin_scaffolder_node.TemplateAction<{
    organization?: string | undefined;
    sourceBranch?: string | undefined;
    targetBranch?: string | undefined;
    title: string;
    repoId: string;
    project?: string | undefined;
    supportsIterations?: boolean | undefined;
    server: string;
    token?: string | undefined;
}, _backstage_types.JsonObject>;

export { cloneAzureRepoAction, pullRequestAzureRepoAction, pushAzureRepoAction };
