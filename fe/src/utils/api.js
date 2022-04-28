import qs from "qs";

const query = qs.stringify({
    populate: ['article', 'users_permissions_user'], 
  }, {
    encodeValuesOnly: true,
  });

const commentsUrl = `http://localhost:1337/api/comments`;

export const getComments = async () => {
    var url = commentsUrl + `?` + query
    const response = await fetch(url, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                },
            });
    const data = await response.json();
    const commentsArr = data.data;
    return commentsArr;
};

export const createComment = async (commentText, articleId, userId, token) => {
    const request = await fetch(commentsUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(
                {
                    data: {
                        comment_text: commentText,
                        article: {
                            id: articleId
                        },
                        users_permissions_user: {
                            id: userId
                        }
                    }
                })
        });
    
        const response = await request.json();
        const newCommentId = response.data.id;

        // Fetch new comment by ID 

        const newCommentDataRequest = await fetch(`${commentsUrl}/${newCommentId}?${query}`);
        const newComment = await newCommentDataRequest.json();
    return newComment;
};

export const updateComment = async (editedText, commentId, articleId, userId, token) => {
    const request = await fetch(`${commentsUrl}/${commentId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(
                {
                    data: {
                        comment_text: editedText,
                        article: {
                            id: articleId
                        },
                        users_permissions_user: {
                            id: userId
                        }
                    }
                })
        });

    var url = commentsUrl + `?` + query
    const gewNewCommentsArray = await fetch(url, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                },
            });
    const data = await gewNewCommentsArray.json();
    const commentsArr = data.data;
    return commentsArr;
};

export const deleteComment = async (commentId, token) => {
    const request = await fetch(`${commentsUrl}/${commentId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    const response = request.json();
    return response;
};

