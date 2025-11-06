import type { INodeProperties } from 'n8n-workflow';

const showOnlyForLookup = {
	operation: ['lookup'],
};

const showOnlyWhenRndSelected = {
	...showOnlyForLookup,
	features: ['RND'],
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
		hint: 'Must be in E.164 format: +[country code][number] (e.g., +48530645813)',
	},
	{
		displayName: 'Features',
		name: 'features',
		type: 'multiOptions',
		displayOptions: { show: showOnlyForLookup },
		options: [
			{
				name: 'Line Type',
				value: 'LineType',
				description: 'Get the type of line (mobile, landline, etc.)',
			},
			{
				name: 'SIM Swap',
				value: 'SimSwap',
				description: 'Detect if the SIM card has been swapped recently',
			},
			{
				name: 'VoIP Detection',
				value: 'VoIPDetection',
				description: 'Check if the number is a VoIP (Voice over IP) number',
			},
			{
				name: 'RND (Reassigned Number Database)',
				value: 'RND',
				description: 'Check if the number has been reassigned to a new subscriber',
			},
		],
		default: ['LineType'],
		required: true,
		description: 'Select which features to include in the lookup request',
		hint: 'At least one feature must be selected. If RND is selected, contact date is required.',
	},
	{
		displayName: 'Contact Date',
		name: 'contactDate',
		type: 'dateTime',
		displayOptions: { show: showOnlyWhenRndSelected },
		default: '',
		required: true,
		description: 'Last contact date with this number (required for RND feature)',
		hint: 'Date when you last contacted this number to check if it was reassigned since. Format: YYYY-MM-DD',
	},
];

