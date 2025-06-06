import { canLeaveEditPage } from './can-leave-edit-page.guard';
import { NewTaskComponent } from '../../components/new-task/new-task.component';

describe('canLeaveEditPage', () => {
  let component: Partial<NewTaskComponent>;
  let confirmSpy: jasmine.Spy;
  const mockRoute = {} as any;
  const mockCurrentState = {} as any;
  const mockNextState = {} as any;

  beforeEach(() => {
    confirmSpy = spyOn(window, 'confirm');
  });

  it('should return true if all fields are empty', () => {
    component = { enteredTitle: '', enteredSummary: '', enteredDate: '' };
    const result = canLeaveEditPage(
      component as NewTaskComponent,
      mockRoute,
      mockCurrentState,
      mockNextState
    );
    expect(result).toBeTrue();
    expect(confirmSpy).not.toHaveBeenCalled();
  });

  it('should call confirm and return its value if title is not empty', () => {
    component = { enteredTitle: 'Test', enteredSummary: '', enteredDate: '' };
    confirmSpy.and.returnValue(false);
    const result = canLeaveEditPage(
      component as NewTaskComponent,
      mockRoute,
      mockCurrentState,
      mockNextState
    );
    expect(confirmSpy).toHaveBeenCalledWith('Are you sure to leave with unsaved changes?');
    expect(result).toBeFalse();
  });

  it('should call confirm and return its value if summary is not empty', () => {
    component = { enteredTitle: '', enteredSummary: 'Summary', enteredDate: '' };
    confirmSpy.and.returnValue(true);
    const result = canLeaveEditPage(
      component as NewTaskComponent,
      mockRoute,
      mockCurrentState,
      mockNextState
    );
    expect(confirmSpy).toHaveBeenCalledWith('Are you sure to leave with unsaved changes?');
    expect(result).toBeTrue();
  });

  it('should call confirm and return its value if date is not empty', () => {
    component = { enteredTitle: '', enteredSummary: '', enteredDate: '2025-06-05' };
    confirmSpy.and.returnValue(true);
    const result = canLeaveEditPage(
      component as NewTaskComponent,
      mockRoute,
      mockCurrentState,
      mockNextState
    );
    expect(confirmSpy).toHaveBeenCalledWith('Are you sure to leave with unsaved changes?');
    expect(result).toBeTrue();
  });
});
