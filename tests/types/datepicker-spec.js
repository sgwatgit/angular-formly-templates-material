import testUtils from './../test-utils';

describe('formlyMaterial - datepicker type', () => {
  //
  // vars
  //
  let $compile;
  let $rootScope;
  let $scope;
  let form;
  let element;
  const minDate = new Date(2015, 10, 19);
  const maxDate = new Date(2015, 11, 20);
  const filterDate = () => true;

  //
  // helpers
  //

  function compile(options) {
    $scope = $rootScope.$new();
    $scope.fields = [angular.merge({}, {
      key: 'testField',
      type: 'datepicker',
      templateOptions: {
        minDate,
        maxDate,
        filterDate,
        label: 'test field',
        placeholder: 'Pick a date'
      }
    }, options)];

    form = $compile(testUtils.getFormTemplate())($scope);
    $scope.$digest();
    element = form.find('[ng-model]');
  }

  //
  // tests
  //

  beforeEach(() => {
    window.module('formlyMaterial');

    inject((_$compile_, _$rootScope_) => {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    });

    compile();
  });

  it('should be md-chips element', () => {
    expect(element[0].nodeName).toBe('MD-DATEPICKER');
  });

  it('should have messages', () => {
    expect(form.find('[ng-messages]').length).toBe(1);
  });

  it('should have min date', () => {
    const scope = angular.element(element).scope();

    expect(element.attr('md-min-date')).toBe(`options.templateOptions['minDate']`);
    expect(scope.options.templateOptions.minDate.toDateString()).toBe(minDate.toDateString());
  });

  it('should have max date', () => {
    const scope = angular.element(element).scope();

    expect(element.attr('md-max-date')).toBe(`options.templateOptions['maxDate']`);
    expect(scope.options.templateOptions.maxDate.toDateString()).toBe(maxDate.toDateString());
  });

  it('should have date filter', () => {
    const scope = angular.element(element).scope();

    expect(element.attr('md-date-filter')).toBe(`options.templateOptions['filterDate']`);
    expect(scope.options.templateOptions.filterDate).toBe(filterDate);
  });
});
