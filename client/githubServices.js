myApp.factory('githubFactory', ['$http', '$q', function($http, $q){
  var obj = {};
  obj.getRepos = function(githubName, pageNumber) {
    return $http({
      url: 'https://api.github.com/users/' + githubName + '/repos?per_page=100&page=' + pageNumber,
      method: 'GET',
    });
  };
  return obj;
}]);

myApp.factory('githubAuthedFactory', ['$http', '$q', function($http, $q){
  var obj = {};
  obj.getRepos = function(githubName, pageNumber) {
    return $http({
      url: 'https://api.github.com/users/' + githubName + '/repos?per_page=100&page=' + pageNumber,
      method: 'GET',
    });
    console.log(req.user);
  };
  return obj;
}]);
