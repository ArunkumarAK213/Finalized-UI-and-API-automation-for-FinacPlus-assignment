const { test, expect } = require('@playwright/test');

test('API Assignment - ReqRes User Lifecycle', async ({ request }) => {
    let userId;

   
    const postResponse = await request.post('https://api.reqres.in/api/users', {
        headers: {
            'x-api-key': 'API_KEY' 
        },
        data: {
            "name": "Arunkumar",
            "job": "QA Automation Intern"
        }
    });
    
    expect(postResponse.status()).toBe(201); 
    const postBody = await postResponse.json();
    userId = postBody.id; 
    console.log(`User created with ID: ${userId}`);

   
    const getResponse = await request.get(`https://api.reqres.in/api/users/${userId}`, {
        headers: {
            'x-api-key': 'API_KEY'
        }
    });
    expect(getResponse.ok()).toBeTruthy();
    const getBody = await getResponse.json();
    expect(getBody.data.name).toBe("Arunkumar");
    expect(getBody.data.job).toBe("QA Automation Intern");

    
    const putResponse = await request.put(`https://api.reqres.in/api/users/${userId}`, {
        headers: {
            'x-api-key': 'API_KEY' 
        },
        data: {
            "name": "Arunkumar Updated",
            "job": "SDET Intern"
        }
    });

    expect(putResponse.status()).toBe(200); 
    const putBody = await putResponse.json();
    
    
    expect(putBody.name).toBe("Arunkumar Updated");
    expect(putBody.job).toBe("SDET Intern");
    console.log('User successfully updated');

     const deleteResponse = await request.delete(`https://api.reqres.in/api/users/${userId}`, {
        headers: {
            'x-api-key': 'API_KEY' 
        }
    });
    expect(deleteResponse.status()).toBe(204);
    console.log('User successfully deleted');
});
