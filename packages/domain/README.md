# `@domain`
> package này giúp xây dựng domain entity, value object , aggregate, domain event.
### Value Object

#### Init.

```ts
export class Nickname extends ValueObject<string> {
    public constructor(properties: ValueObjectProperties<string>) {
        super(properties);
    }

    public validate(properties: ValueObjectProperties<string>): void {
        if (properties.value.length < 3) {
            throw new IllegalArgumentException('invalid Nickname');
        }
    }
}
```

#### Get value.
```ts
const ninckname = new Nickname({ value: 'nodejs'});

const nicknameValue = ninckname.value;
```

#### Clone.
```ts
const ninckname = new Nickname({ value: 'nodejs'});

const nicknameClone = ninckname.clone();
```

#### Compare.
```ts
const ninckname = new Nickname({ value: 'nodejs'});

const nicknameClone = ninckname.clone();

nicknameClone.equal(ninckname);
```


### Entity

#### Init.

```ts
export type UserProps = {
    username: Username;
    nickname: Nickname[];
    fullname: Fullname;
};

export class User extends Entity<UUID, UserProps> {
    protected _id: UUID;

    constructor(entityProps: EntityProps<UUID, UserProps>, setting?: EntitySetting) {
        super(entityProps, setting);
        this._id = entityProps.id;
    }

    public validate(): void {
        const props = this.toObject<object>();
        if (Object.keys(props).length > 50) {
            throw new Error('Entity too long');
        }
    }
}
```

#### Get full property.
```ts
const user = new User(/**args**/);

const props = user.entityProps();
```

#### Get property by key.
> get support lấy tất cả các property của entity.
```ts
const user = new User(/**args**/);

const username = user.get('username');
```
#### Get id property.
```ts
const user = new User(/**args**/);

const id = user.id;
```
#### Get timestamp property.
```ts
const user = new User(/**args**/);

const createdAt = user.createdAt;
const updatedAt = user.updatedAt;
const deletedAt = user.deletedAt;
```

#### Set  by key.
> Nếu lúc khởi tạo entity setting không cho phép prop setter sẽ throw exception.

```ts
const user = new User(/**args**/);

user.set('username', /** value **/);
// hoặc
user.set({
    username: /** value **/
})
```
#### Clone.
```ts
const user = new User(/**args**/);

const userClone = user.clone();
```

#### Compare.
```ts
const user = new User(/**args**/);

const userClone = user.clone();

userClone.equal(user);
```

#### Check changed.

```ts
const user = new User(/**args**/);

user.set('username', /** value **/);

const isChanged = user.isChanged()
```


#### Get snapshot.
> Snapshot entity (plaint object entity) được tạo 1 lần khi tạo mới entity.

```ts
const user = new User(/**args**/);

user.getSnapshot();
```
#### To plain object.
```ts
const user = new User(/**args**/);

user.toObject();
```