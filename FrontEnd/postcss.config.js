module.exports = 
{
	plugins:
	{
		'postcss-import': {}, //resolve @import statements in CSS file first
		'postcss-simple-vars': {},
		'postcss-cssnext': //bundle all css
		{
			browsers: ['last 2 versions', '>5%'], //autoprefixer options
		},
	},
}
