import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from '../../src/helpers/fileUpload';

cloudinary.config({
    cloud_name: 'braiamt',
    api_key: '896734623186848',
    api_secret: 'q4UGcuVRIfoTT4r3tY4SV021q9U',
    secure: true
});

describe('Pruebas en fileUpload', () => {

    test('debe de subir el archivo correctamente a cloudinary', async() => {
        const imageUrl = 'https://19yw4b240vb03ws8qm25h366-wpengine.netdna-ssl.com/wp-content/uploads/10-Free-To-Use-CORS-Proxies-1024x768.png';
        const resp = await fetch( imageUrl );
        const blob = await resp.blob();
        const file = new File([ blob ], 'zero_two.jpg');

        const url = await fileUpload( file );

        expect( typeof( url ) ).toBe( 'string' );
        
        const segments = url.split('/');
        const imageId = segments[ segments.length - 1 ].replace('.png', '');
        
        await cloudinary.api.delete_resources([ 'journal-app/' + imageId ], { resource_type: 'image' });
    });

    test('debe de retornar null si no se envía un archivo', async() => {
        const file = new File([], 'foto.jpg');
        const url = await fileUpload(file);

        expect( url ).toBe( null );
    });

});
  