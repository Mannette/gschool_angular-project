var greetings;

myApp.controller('loginController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.login = function () {

      // initial values
      $scope.loginError = false;
      $scope.disabled = true;

      // call login from service
      AuthService.login($scope.loginForm.username, $scope.loginForm.password)
        // handle success
        .then(function () {
          $location.path('/main');
          $scope.disabled = false;
          $scope.loginForm = {};
        })
        // handle error
        .catch(function () {
          $scope.loginError = true;
          setTimeout(function() {
            $scope.loginError = false;
          }, 500);
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = false;
          $scope.loginForm = {};
        });

    };

    $scope.register = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;
      $scope.success = false;

      // call register from service
      AuthService.register($scope.registerForm.username, $scope.registerForm.password)
        // handle success
        .then(function () {
          $location.path('/');
          $scope.disabled = false;
          $scope.registerForm = {};
          $scope.success = true;
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Something went wrong!";
          $scope.disabled = false;
          $scope.registerForm = {};
        });

    };

}]);

myApp.controller('logoutController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.logout = function () {

      // console.log(AuthService.getUserStatus());

      // call logout from service
      AuthService.logout()
        .then(function () {
          $scope.hasAuthed = false;
          $location.path('/');
        });

    };

}]);

myApp.controller('githubController',
  ['$scope', '$location', '$http', 'githubFactory', 'githubAuthedFactory',
  function ($scope, $location, $http, githubFactory, githubAuthedFactory) {
    var pageNumber = 1;
    $scope.allRepos = [];

    $scope.getGithub = function () {
      // initial values
      $scope.error = false;
      $scope.disabled = true;
      $scope.image = false;
      $scope.searched = false;
      $scope.hasBlog = false;
      $scope.hasLocation = false;

      $http({
        method: 'GET',
        url: 'https://api.github.com/users/' + $scope.githubName
      })
        // handle success
        .then(function (res) {
          // console.log(res.data);
          $scope.searched = true;
          $scope.githubAvatar = res.data.avatar_url;
          $scope.image = true;
          $scope.githubUsername = res.data.name;
          if (res.data.blog !== null) {
            $scope.hasBlog = true;
            $scope.blog = res.data.blog;
          }
          $scope.email = res.data.email;
          if (res.data.location !== null) {
            $scope.hasLocation = true;
            $scope.location = res.data.location;
          }
          $scope.totalRepos = res.data.public_repos;
          $scope.stalkers = res.data.followers;
          $scope.stalkees = res.data.following;
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Something went wrong!";
          $scope.disabled = false;
          $scope.registerForm = {};
        });
        $scope.getRepoPages();
        console.log('blue button');

    };

    $scope.getRepoPages = function() {

      githubFactory.getRepos($scope.githubName, pageNumber).success(function(res) {
        $scope.allRepos.push(res);
        if (res.length === 100) {
          pageNumber++;
          $scope.getRepoPages();
        } else {
          $scope.mergedArr = [].concat.apply([], $scope.allRepos);
          $scope.getData($scope.mergedArr);
        }
      });
    };

    $scope.getData = function(array) {
      var totalForks = 0;
      var addedStars = 0;
      var addedCommits = 0;
      $scope.numberStarredRepos = 0;

      for (var i = 0; i < array.length; i++) {
        totalForks += array[i].forks_count;
        addedStars += array[i].stargazers_count;
        if (array[i].stargazers_count !== 0) {
          $scope.numberStarredRepos ++;
        }
        $scope.forks = totalForks;
        $scope.totalStars = addedStars;
      }
    };

    $scope.githubLogin = function() {
      // call login from service
      AuthService.gitHubLogin()
        // handle success
        .then(function () {
          $location.path('/main');
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Invalid username and/or password";
        });

    };

    $scope.getAuthedGithub = function() {
      // initial values
      $scope.error = false;
      $scope.disabled = true;
      $scope.image = false;
      $scope.searched = false;
      $scope.hasBlog = false;
      $scope.hasLocation = false;

      $http({
        method: 'GET',
        url: 'https://api.github.com/users/' + $scope.githubName
      })
        // handle success
        .then(function (res) {
          // console.log(res.data);
          $scope.searched = true;
          $scope.githubAvatar = res.data.avatar_url;
          $scope.image = true;
          $scope.githubUsername = res.data.name;
          if (res.data.blog !== null) {
            $scope.hasBlog = true;
            $scope.blog = res.data.blog;
          }
          $scope.email = res.data.email;
          if (res.data.location !== null) {
            $scope.hasLocation = true;
            $scope.location = res.data.location;
          }
          $scope.totalRepos = res.data.public_repos;
          $scope.stalkers = res.data.followers;
          $scope.stalkees = res.data.following;
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Something went wrong!";
          $scope.disabled = false;
          $scope.registerForm = {};
        });
        getAuthedRepoPages();
        console.log('green button');
    };

    $scope.getAuthedRepoPages = function() {

      githubAuthedFactory.getRepos($scope.githubName, pageNumber).success(function(res) {
        $scope.allRepos.push(res);
        if (res.length === 100) {
          pageNumber++;
          $scope.getRepoPages();
        } else {
          $scope.mergedArr = [].concat.apply([], $scope.allRepos);
          $scope.getData($scope.mergedArr);
        }
      });
    };

    $scope.getAuthed = function() {
      console.log($scope.hasAuthed)
      $scope.hasAuthed = true;
    };

}]);


/*
url: 'https://api.github.com/users/mjhea0/repos?per_page=100&page=1'
 */
