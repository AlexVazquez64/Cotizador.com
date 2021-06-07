
exports.findOrCreate({where: {username: 'sdepold'}, defaults: {job: 'Technical Lead JavaScript'}})
.then(([user, created]) => {
  console.log(user.get({
    plain: true
  }))
  console.log(created)

});

exports.findOne({
  where: { key },
  order: [ [ 'createdAt', 'DESC' ]],
});