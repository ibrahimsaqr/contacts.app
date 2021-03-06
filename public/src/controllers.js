app.controller('ListController', function($rootScope, $scope, Contact, $location){
    $rootScope.PAGE = 'all';
    $scope.contacts = Contact.query();
    $scope.fields = ['firstName', 'lastName'];
    $scope.sort = function(field){
        $scope.sort.field = field;
        $scope.sort.order = !$scope.sort.order;
    };
    $scope.sort.field = 'firstName';
    $scope.sort.order = false;

    $scope.show = function(id){
        $location.url('/contact/' + id);
    };
});

app.controller('NewController', function($rootScope, $scope, Contact, $location){
    $rootScope.PAGE = 'new';
    $scope.contact = new Contact({
        firstName:  ['', 'text'],
        lastName:   ['', 'text'],
        email:      ['', 'email'],
        homePhone:  ['', 'tel'],
        cellPhone:  ['', 'tel'],
        birthday:   ['', 'date'],
        website:    ['', 'url'],
        address:    ['', 'text']
    });

    $scope.save = function(){
        if ($scope.newContact.$invalid) {
            $scope.$broadcast('record:invalid');
        } else {
            $scope.contact.$save();
            $location.url('/contacts');
        }
    };
});

app.controller('SingleController', function($rootScope, $scope, $location, Contact, $routeParams){
    $rootScope.PAGE = 'single';
    $scope.contact = Contact.get({ id: parseInt($routeParams.id, 10) });
    $scope.delete = function(){
        $scope.contact.$delete();
        $location.url('/contacts');
    };
});
 
