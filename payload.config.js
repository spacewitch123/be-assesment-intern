const { buildConfig } = require('payload/config');
import Users from './collections/Users';


export default buildConfig({
    collections: [
        Users,
    ],
    admin: {
        user: 'users',  // This specifies that 'users' collection will be used for authentication
    },
});
