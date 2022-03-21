function client(endpoint, customConfig = {}) {
    console.log('client')
    const config = {
        method: 'GET',
        ...customConfig
    }

    return fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, config).then(async res => {
        const data = await res.json();
        if(!res.ok) return Promise.reject(data);

        return data
    })
}

export {client}

/*






























💰 spoiler alert below...



























































const config = {
    method: 'GET',
    ...customConfig,
  }
*/
