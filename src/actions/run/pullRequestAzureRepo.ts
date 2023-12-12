import { InputError } from "@backstage/errors";
import { ScmIntegrationRegistry } from "@backstage/integration";
import { createTemplateAction } from "@backstage/plugin-scaffolder-backend";
import { getBearerHandler } from "azure-devops-node-api";
import * as GitInterfaces from "azure-devops-node-api/interfaces/GitInterfaces";
import { createADOPullRequest } from "../helpers";

/**
 * Creates an `ado:repo:pr` Scaffolder action.
 *
 * @remarks
 *
 * This Scaffolder action will create a PR to a repository in Azure DevOps.
 *
 * @public
 */
export const pullRequestAzureRepoAction = (options: {
  integrations: ScmIntegrationRegistry;
}) => {
  const { integrations } = options;

  return createTemplateAction<{
    organization?: string;
    sourceBranch?: string;
    targetBranch?: string;
    title: string;
    repoId: string;
    project?: string;
    supportsIterations?: boolean;
    server: string;
    token?: string;
  }>({
    id: "azure:repo:pr",
    description: "Create a PR to a repository in Azure DevOps.",
    schema: {
      input: {
        type: "object",
        required: ["repoId", "title"],
        properties: {
          organization: {
            title: "Organization Name",
            type: "string",
            description: "The name of the organization in Azure DevOps.",
          },
          sourceBranch: {
            title: "Source Branch",
            type: "string",
            description: "The branch to merge into the source.",
          },
          targetBranch: {
            title: "Target Branch",
            type: "string",
            description: "The branch to merge into (default: main).",
          },
          title: {
            title: "Title",
            description: "The title of the pull request.",
            type: "string",
          },
          repoId: {
            title: "Remote Repo ID",
            description: "Repo ID of the pull request.",
            type: "string",
          },
          project: {
            title: "ADO Project",
            description: "The Project in Azure DevOps.",
            type: "string",
          },
          supportsIterations: {
            title: "Supports Iterations",
            description: "Whether or not the PR supports interations.",
            type: "boolean",
          },
          server: {
            type: "string",
            title: "Server hostname",
            description:
              "The hostname of the Azure DevOps service. Defaults to dev.azure.com",
          },
          token: {
            title: "Authenticatino Token",
            type: "string",
            description: "The token to use for authorization.",
          },
        },
      },
    },
    async handler(ctx) {
      const { title, repoId, server, project, supportsIterations } = ctx.input;

      const sourceBranch =
        `refs/heads/${ctx.input.sourceBranch}` ?? `refs/heads/scaffolder`;
      const targetBranch =
        `refs/heads/${ctx.input.targetBranch}` ?? `refs/heads/main`;

      const host = server ?? "dev.azure.com";
      const type = integrations.byHost(host)?.type;

      if (!type) {
        throw new InputError(
          `No matching integration configuration for host ${host}, please check your integrations config`
        );
      }

      const pullRequest: GitInterfaces.GitPullRequest = {
        sourceRefName: sourceBranch,
        targetRefName: targetBranch,
        title: title,
      } as GitInterfaces.GitPullRequest;

      const organization = ctx.input.organization ?? "notempty";
      const url = `https://${host}/${organization}`;

      // const credentialProvider =
      //   DefaultAzureDevOpsCredentialsProvider.fromIntegrations(integrations);
      // const credentials = await credentialProvider.getCredentials({ url: url });

      // if (credentials === undefined && ctx.input.token === undefined) {
      //   throw new InputError(
      //     `No credentials provided ${url}, please check your integrations config`,
      //   );
      // }

      // const authHandler =
      //   ctx.input.token || credentials?.type === 'pat'
      //     ? getPersonalAccessTokenHandler(ctx.input.token ?? credentials!.token)
      //     : getBearerHandler(credentials!.token);

      // We assume we receive an OAuth access token, that we need to pass as bearer token
      const authHandler = getBearerHandler(ctx.input.token!);

      console.log("creating PR", {
        token: ctx.input.token,
        url,
        authHandler,
        repoId,
        project,
      });

      await createADOPullRequest({
        gitPullRequestToCreate: pullRequest,
        url: url,
        authHandler: authHandler,
        repoId: repoId,
        project: project,
        supportsIterations: supportsIterations,
      });
    },
  });
};
