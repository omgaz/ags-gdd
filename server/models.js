var crypto,
    User,
    Role,
    Story,
    Task,
    Message,
    Act,
    Puzzle,
    Dialog,
    Location,
    Character,
    Item;
    

function extractKeywords(text) {
  if (!text) return [];

  return text.
    split(/\s+/).
    filter(function(v) { return v.length > 2; }).
    filter(function(v, i, a) { return a.lastIndexOf(v) === i; });
}


function defineModels(mongoose, fn) {
    
    var Schema      = mongoose.Schema,
        ObjectId    = Schema.ObjectId;
    
    /**
     * Model: User
     */
    function validatePresenceOf(value) {
        return value && value.length;
    }
    
    User = new Schema({
        "name": String,
        "email": { type: String, validate: [validatePresenceOf, 'an email is required'], index: { unique: true } },
        "hashed_password": String,
        "salt": String,
        "created_on": { type: Date, default: Date.now },
        "last_login" Date,
        "roles" : [Role],
        "current_story": ObjectId,
        "tasks": [Task],
        "messages": [Message]
    });
    
    User.virtual('id').get(function() {
        return this._id.toHexString();
    });
    
    User.virtual('password').set(function(password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
    }).get(function() { return this._password; });
    
    User.method('authenticate', function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    });
    
    User.method('makeSalt', function() {
        return Math.round((new Date().valueOf() * Math.random())) + '';
    });
    
    User.method('encryptPassword', function(password) {
        return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
    });
    
    User.pre('save', function(next) {
        if (!validatePresenceOf(this.password)) {
            next(new Error('Invalid password'));
        } else {
            next();
        }
    });
    
    /**
     * Model: Role
     */
     Role = new Schema({
        'name': { type: String, index: true },
        'rank': Number,
        "story": ObjectId
    });
        
    Role.virtual('id').get(function() {
        return this._id.toHexString();
    });
        
    Role.pre('save', function(next) {
        this.keywords = extractKeywords(this.data);
        next();
    });
    
    /**
     * Model: Task
     */
     Task = new Schema({
        'name': { type: String, index: true },
        'created_by': ObjectId,
        "created_on": { type: Date, default: Date.now },
        "completed_on": Date,
        'completed': Boolean,
        'due_date': Date
    });
        
    Task.virtual('id').get(function() {
        return this._id.toHexString();
    });
        
    Task.pre('save', function(next) {
        this.keywords = extractKeywords(this.data);
        next();
    });
    
    /**
     * Model: Message
     */
     Message = new Schema({
        'name': { type: String, index: true },
        'rank': Number,
        'created_by': ObjectId,
        "created_on": { type: Date, default: Date.now },
        "read": Boolean,
        "read_date": Date,
        "story": ObjectId
    });
        
    Message.virtual('id').get(function() {
        return this._id.toHexString();
    });
        
    Message.pre('save', function(next) {
        this.keywords = extractKeywords(this.data);
        next();
    });
    
    
    /**
     * Model: Story
     */
     Story = new Schema({
        'name': String,
        "sypnosis": String,
        "created_on": { type: Date, default: Date.now },
        "modified_on": Date,
        'keywords': [String],
        'team': [User],
        "acts": [Act]
    });
        
    Story.virtual('id').get(function() {
        return this._id.toHexString();
    });
        
    Story.pre('save', function(next) {
        this.keywords = extractKeywords(this.data);
        this.modified_on = Date.now;
        next();
    });
    
    /**
     * Model: Act
     */
     Act = new Schema({
        'name': String,
        "sypnosis": String,
        "created_on": { type: Date, default: Date.now },
        "modified_on": Date,
        'keywords': [String],
        "characters": [Character],
        "locations": [Location],
        "puzzles": [Puzzle],
        "dialogues": [Dialog],
        "items": [Item]
    });
        
    Act.virtual('id').get(function() {
        return this._id.toHexString();
    });
        
    Act.pre('save', function(next) {
        this.keywords = extractKeywords(this.data);
        this.modified_on = Date.now;
        next();
    });
    
    /**
     * Model: Puzzle
     */
     Puzzle = new Schema({
        'name': String,
        "description": String,
        "created_on": { type: Date, default: Date.now },
        "modified_on": Date,
        'keywords': [String]
    });
        
    Puzzle.virtual('id').get(function() {
        return this._id.toHexString();
    });
        
    Puzzle.pre('save', function(next) {
        this.keywords = extractKeywords(this.data);
        this.modified_on = Date.now;
        next();
    });
    
    /**
     * Model: Character
     */
     Character = new Schema({
        'name': String,
        "description": String,
        "created_on": { type: Date, default: Date.now },
        "modified_on": Date,
        'keywords': [String]
    });
        
    Character.virtual('id').get(function() {
        return this._id.toHexString();
    });
        
    Character.pre('save', function(next) {
        this.keywords = extractKeywords(this.data);
        this.modified_on = Date.now;
        next();
    });
    
    /**
     * Model: Location
     */
     Location = new Schema({
        'name': String,
        "description": String,
        "created_on": { type: Date, default: Date.now },
        "modified_on": Date,
        'keywords': [String]
    });
        
    Location.virtual('id').get(function() {
        return this._id.toHexString();
    });
        
    Location.pre('save', function(next) {
        this.keywords = extractKeywords(this.data);
        this.modified_on = Date.now;
        next();
    });
    
    /**
     * Model: Dialog
     */
     Dialog = new Schema({
        'name': String,
        "description": String,
        "created_on": { type: Date, default: Date.now },
        "modified_on": Date,
        'keywords': [String]
    });
        
    Dialog.virtual('id').get(function() {
        return this._id.toHexString();
    });
        
    Dialog.pre('save', function(next) {
        this.keywords = extractKeywords(this.data);
        this.modified_on = Date.now;
        next();
    });
    
    /**
     * Model: Item
     */
     Item = new Schema({
        'name': String,
        "description": String,
        "created_on": { type: Date, default: Date.now },
        "modified_on": Date,
        'keywords': [String]
    });
        
    Item.virtual('id').get(function() {
        return this._id.toHexString();
    });
        
    Item.pre('save', function(next) {
        this.keywords = extractKeywords(this.data);
        this.modified_on = Date.now;
        next();
    });
    

    Task,
    Message
}


exports.defineModels = defineModels;