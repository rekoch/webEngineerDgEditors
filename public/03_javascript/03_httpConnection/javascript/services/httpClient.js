const httpRemoteUrl = 'localhost:3000';

async function httpGet(slug) {
    const response = await fetch(`http://${httpRemoteUrl}/${slug}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

async function httpPost(slug, data) {
    const response = await fetch(`http://${httpRemoteUrl}/${slug}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

async function httpDelete(slug, data) {
    const response = await fetch(`http://${httpRemoteUrl}/${slug}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

export { httpGet, httpPost, httpDelete };