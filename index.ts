class User {
	private name: string;
	private email: string;

	constructor() {
		this.name = "John Doe";
		this.email = "jodhdoe@gmail.com";
	}

	getName() {
		return this.name;
	}

	getEmail() {
		return this.email;
	}
}

const Wrapper = <T extends { new (...args: any[]): any }>(Clz: T): InstanceType<T> => {
	let instance: InstanceType<T>;

	return new Proxy(
		{},
		{
			get: (_, prop) => {
				if (!instance) {
					instance = new Clz(); // Initialize the class here
				}
				return instance[prop];
			},
		}
	) as InstanceType<T>;
};

const user = Wrapper(User);

console.log(user.getName());
