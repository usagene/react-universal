import {Dispatcher} from 'flux';

class DemoDispatcher extends Dispatcher{
	customFunction(){
		console.log('This is a custom dispatcher function.');
	}
}

export default new DemoDispatcher();
