const axios = require('axios');

const ApiKey = "1e3b1acedce6480384157b9fac9fe4e7";

const helpers = {
	runQuery: function(searchTerm, startYear, endYear){
		const queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q="+ searchTerm +"&page=0&sort=newest&begin_date="+startYear+"0101&end_date="+endYear+"0101&api-key=" + key;
		const options = {
			url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
			qs: {
				'api-key': "910f87367bad43da8984cee4e521240a",
				'q': searchTerm,
				'begin_date': "20120906",
				'end_date': "20160203",
				'sort': "newest"
			}

		};
	
		return axios.get(queryURL)
		.then(function(response){
			console.log(response);
			var data = response.data.response.docs;
			return data;
		})

	},
	getSaved: function(){
		return axios.get('/api/saved')
			.then(function(response){
				console.log(response.data);
				return response.data;
			});
	},
	saveArticle: function(article, i){
		console.log(article);
		return axios.post('/api/saved', article)
			.then(function(results){
				return(results);
			})
	}
}

module.exports = helpers;