class Handler {
    login(ctx,broker){
        const users = [
            { id: 1, name: "John Doe", email: "john.doe@example.com" },
            { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
            { id: 3, name: "Bob Johnson", email: "bob.johnson@example.com" },
        ];
        return users;
    }
}

module.exports = Handler;