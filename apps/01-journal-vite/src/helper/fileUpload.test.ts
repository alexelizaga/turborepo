import { fileUpload } from './fileUpload';

xdescribe('Test fileUpload', () => {
  test('should upload a file', async() => {
    const imageUrl = "https://i.picsum.photos/id/760/200/200.jpg?hmac=MlH81fLiPAKVmDN5qADWkd_299jLg9vp9uVnRn3uxp8";
    const resp = await fetch( imageUrl );
    const blob = await resp.blob();
    const file = new File([blob], 'photo.jpg');

    const url = await fileUpload( file, "test-uid", "test-note-id" );
    expect( typeof url ).toBe("string");
  });
});
