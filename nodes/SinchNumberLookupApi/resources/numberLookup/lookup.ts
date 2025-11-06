import type { INodeProperties } from 'n8n-workflow';

const showOnlyForLookup = {
	operation: ['lookup'],
	resource: ['numberLookup'],
};

export const numberLookupDescription: INodeProperties[] = [
	{
		displayName: 'Number',
		name: 'number',
		type: 'string',
		displayOptions: { show: showOnlyForLookup },
		default: '',
		required: true,
		description: 'The phone number to lookup in E.164 format (must start with + followed by country code and number)',
		placeholder: '+48530645813',
		hint: 'Must be in E.164 format: +[country code][number] (e.g., +48530645813)'
	},
];
