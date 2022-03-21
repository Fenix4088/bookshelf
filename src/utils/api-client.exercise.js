function client(endpoint, customConfig = {}) {
    console.log('client')
    const config = {
        method: 'GET',
        ...customConfig
    }

    return fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, config).then(res => res.json())
}

export {client}

/*






























💰 spoiler alert below...



























































const config = {
    method: 'GET',
    ...customConfig,
  }
*/
