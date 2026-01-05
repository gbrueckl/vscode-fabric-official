import * as vscode from 'vscode';

import { ArtifactTreeNode, IArtifact, IFabricTreeNodeProvider, ILocalProjectTreeNodeProvider, LocalProjectTreeNode } from '@microsoft/vscode-fabric-api';;
import { LakehouseTreeNode } from './LakehouseTreeNode';

// Remote workspace tree customization
export class LakehouseTreeNodeProvider implements IFabricTreeNodeProvider {
    public readonly artifactType = 'Lakehouse';

    constructor(private ctx: vscode.ExtensionContext) { }

    async createArtifactTreeNode(artifact: IArtifact): Promise<ArtifactTreeNode> {
        // Return your specialized node (can override getChildNodes, commands, contextValue, etc.)
        return new LakehouseTreeNode(this.ctx, artifact);
    }
}
