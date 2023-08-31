# @brtmvdl/backend

- [ ] "Choice" statement

```
db.in('logins').from('*').choice()
  .when(Database.xpath('user_id = "123"'))
    .write('123')
      .to('finished_at')
  .otherwise()
    .write('321')
      .to('finished_at')
```

## License

[MIT](./LICENSE)
