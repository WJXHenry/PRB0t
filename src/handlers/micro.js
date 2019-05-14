const PR = require('./../PullRequest').default;
const {json} = require('micro');

const handler = async (req, res) => {
    try {
        const body = await json(req);

        // Set the commit author if requested.
        let author = {
            name: 'PRB0t',
            email: '34620110+PRB0t@users.noreply.github.com',
        };
        if (body.author) {
            author = body.author
        }

        const pr = new PR(body.user, body.repo, body.branch, body.token);
        pr.configure(body.files, body.commit, body.title, body.description, author);
        const { data } = await pr.send();
        return data;
    } catch(err) {
        console.log(err);
        const error = new Error(`Pull request can't be created!`)
        error.statusCode = 500
        throw error
    }
}

module.exports = handler;
