import XLSX from 'xlsx';

export default {
    methods:{
        //funcion para exportar a excel un objeto enviado
        exportExcel(viajes){
            let data = XLSX.utils.json_to_sheet(viajes);
            //define los nombres de las celdas del excel
            data['A1'].v = 'Nro';
            data['B1'].v = 'Punto de inicio';
            data['C1'].v = 'Punto de termino';
            data['D1'].v = 'Kilometros recorridos';
            data['E1'].v = 'Ida y vuelta';
            data['F1'].v = 'Fecha';
            data['G1'].v = 'Medio de Transporte';
            data['H1'].v = 'KGCO2';
            
            const workbook = XLSX.utils.book_new();
            const filename = 'viajes';
            XLSX.utils.book_append_sheet(workbook, data, filename);
            XLSX.writeFile(workbook, `${filename}.xlsx`);
        }
    }     
}