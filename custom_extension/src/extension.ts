import * as vscode from 'vscode';
import { IFabricExtension, IFabricExtensionManager, apiVersion } from '@microsoft/vscode-fabric-api';
import { NotebookArtifactHandler } from './fabric/NotebookArtifactHandler';
import { LakehouseArtifactHandler } from './fabric/LakehouseArtifactHandler';

export async function activate(ctx: vscode.ExtensionContext) {
    const core = vscode.extensions.getExtension('fabric.vscode-fabric')?.exports as IFabricExtensionManager;
    if (!core) {
        throw new Error('Core Fabric extension not available!');
    }
    const ext: IFabricExtension = {
        identity: ctx.extension.id,
        apiVersion: apiVersion, // must match major.minor
        artifactTypes: ['Notebook', 'Lakehouse'],
        treeNodeProviders: [],
        localProjectTreeNodeProviders: [],
        artifactHandlers: [new NotebookArtifactHandler(), new LakehouseArtifactHandler()],
    };
    const services = core.addExtension(ext); // IFabricExtensionServiceCollection
    // services.accountManager / services.workspaceManager / services.artifactManager now available
}
