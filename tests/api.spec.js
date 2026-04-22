const { test, expect } = require('@playwright/test');

test('API Assignment - ReqRes User Lifecycle', async ({ request }) => {
    let userId;

    // 1. Create a user and validate status code 201 (Created)
    const postResponse = await request.post('https://api.reqres.in/api/users', {
        headers: {
            'x-api-key': 'reqres_cb13a46b93b846b1a72d9cc4ffb6113c' // Replace with your actual API key from app.reqres.in
        },
        data: {
            "name": "Arunkumar",
            "job": "QA Automation Intern"
        }
    });
    
    expect(postResponse.status()).toBe(201); // Mandatory validation
    const postBody = await postResponse.json();
    userId = postBody.id; // Store userId for the next steps
    console.log(`User created with ID: ${userId}`);

    // 2. Get the created user details and validate the request is successful
    const getResponse = await request.get(`https://api.reqres.in/api/users/${userId}`, {
        headers: {
            'x-api-key': 'reqres_cb13a46b93b846b1a72d9cc4ffb6113c' // Replace with your actual API key
        }
    });
    expect(getResponse.ok()).toBeTruthy();
    const getBody = await getResponse.json();
    expect(getBody.data.name).toBe("Arunkumar");
    expect(getBody.data.job).toBe("QA Automation Intern");

    // 3. Update user's details and validate status code 200 (OK)
    const putResponse = await request.put(`https://api.reqres.in/api/users/${userId}`, {
        headers: {
            'x-api-key': 'reqres_cb13a46b93b846b1a72d9cc4ffb6113c' // Replace with your actual API key
        },
        data: {
            "name": "Arunkumar Updated",
            "job": "SDET Intern"
        }
    });

    expect(putResponse.status()).toBe(200); 
    const putBody = await putResponse.json();
    
    // Validate the response payload matches our update
    expect(putBody.name).toBe("Arunkumar Updated");
    expect(putBody.job).toBe("SDET Intern");
    console.log('User successfully updated');

    // 4. Delete the user and validate status code 204 (No Content)
    const deleteResponse = await request.delete(`https://api.reqres.in/api/users/${userId}`, {
        headers: {
            'x-api-key': 'reqres_cb13a46b93b846b1a72d9cc4ffb6113c' // Replace with your actual API key
        }
    });
    expect(deleteResponse.status()).toBe(204);
    console.log('User successfully deleted');
});