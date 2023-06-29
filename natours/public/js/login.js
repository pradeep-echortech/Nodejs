/*eslint-disable*/

const login = async (email, password) => {
    console.log(email,password)
  try {
    const res = await fetch('http://localhost:5000/api/v1/users/login',{
      method: 'POST',
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    console.log(res);
    return res.json()
  } catch (error) {
    console.log(error.resp);
  }
};

document.getElementById('login').addEventListener('click', (e) => {
  console.log(e);
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  login(email, password);
});

