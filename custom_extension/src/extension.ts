import * as vscode from 'vscode';
import { IFabricExtension, IFabricExtensionManager, apiVersion } from '@microsoft/vscode-fabric-api';
import { NotebookArtifactHandler } from './fabric/satellite/aftifactHandlers/NotebookArtifactHandler';
import { LakehouseArtifactHandler } from './fabric/satellite/aftifactHandlers/LakehouseArtifactHandler';
import { LakehouseTreeNodeProvider } from './fabric/satellite/treeNodeProviders/LakehouseTreeNodeProvider';

export async function activate(ctx: vscode.ExtensionContext) {
    const core = vscode.extensions.getExtension('fabric.vscode-fabric')?.exports as IFabricExtensionManager;
    if (!core) {
        throw new Error('Core Fabric extension not available!');
    }
    const ext: IFabricExtension = {
        identity: ctx.extension.id,
        apiVersion: apiVersion, // must match major.minor
        artifactTypes: ['Notebook', 'Lakehouse'],
        treeNodeProviders: [new LakehouseTreeNodeProvider(ctx)],
        localProjectTreeNodeProviders: [],
        artifactHandlers: [new NotebookArtifactHandler(), new LakehouseArtifactHandler()],
    };
    const services = core.addExtension(ext); // IFabricExtensionServiceCollection
    // services.accountManager / services.workspaceManager / services.artifactManager now available
}
