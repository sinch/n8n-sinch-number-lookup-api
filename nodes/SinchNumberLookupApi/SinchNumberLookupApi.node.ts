import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { numberLookupOperations } from './resources/numberLookup';

export class SinchNumberLookupApi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Sinch Number Lookup Api',
		name: 'sinchNumberLookupApi',
		icon: 'file:sinch_logotype_black.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with the Sinch Number Lookup Api API',
		defaults: {
			name: 'Sinch Number Lookup Api',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'sinchNumberLookupApiOAuth2Api', required: true }],
		requestDefaults: {
			baseURL: 'https://lookup.api.sinch.com',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Project ID',
				name: 'projectId',
				type: 'string',
				default: '',
				required: true,
				description: 'Your Sinch project ID',
			},
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Number Lookup',
						value: 'numberLookup',
					},
				],
				default: 'numberLookup',
			},
			...numberLookupOperations,
		],
	};
}
