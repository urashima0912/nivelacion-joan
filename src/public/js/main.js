async function DeleteUser(user) {
    console.log(user._id)
    await fetch(`http://localhost:4500/api/remove/${user._id}`, {
    method: 'delete'
  })
  window.location.reload();
}  

