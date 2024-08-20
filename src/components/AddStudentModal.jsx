import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import axios from '../api/Index';
import Cookies from 'js-cookie';

const AddStudentModal = ({ isOpen, onClose, fetchData }) => {
  const [formData, setFormData] = useState({
    nama_lengkap: '',
    nama_panggilan: '',
    nis: '',
    nisn: '',
    gender_id: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    agama: '',
    kewarganegaraan: '',
    no_hp: '',
    alamat_lengkap: '',
    kecamatan: '',
    kota_kabupaten: '',
    status_tempat_tinggal: '',
    tinggal_dengan: '',
    anak_ke: '',
    jumlah_saudara: '',
    department_id: '',
    classroom_id: '',
    angkatan: '',
    ke_sekolah_menggunakan: '',
    daftar_jalur: '',
    no_seri_ijazah_smp: '',
    nama_orang_tua: '',
    status_orang_tua: '',
    tempat_lahir_orang_tua: '',
    pendidikan_terakhir: '',
    pekerjaan_orang_tua: '',
    perkiraan_penghasilan: '',
    jumlah_tanggungan: '',
    alamat_orang_tua: '',
    no_hp_orang_tua: '',
    pas_foto: null,
    scan_ijazah_smp: null,
    scan_akte_kelahiran: null,
    scan_kartu_keluarga: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = Cookies.get('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    const studentData = new FormData();
    Object.keys(formData).forEach((key) => {
      studentData.append(key, formData[key]);
    });

    try {
      await axios.post('/api/admin/siswa', studentData, config);
      fetchData();
      onClose();
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-3xl p-8 rounded-md shadow-lg max-h-screen overflow-y-auto">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 relative">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold tracking-wider text-gray-800">Tambah Data Siswa</h3>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4 text-gray-700">
            {/* Student Information */}
            <div>
              <label><strong>Nama Lengkap:</strong></label>
              <input type="text" name="nama_lengkap" value={formData.nama_lengkap} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />

              <label><strong>Nama Panggilan:</strong></label>
              <input type="text" name="nama_panggilan" value={formData.nama_panggilan} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />

              <label><strong>NIS:</strong></label>
              <input type="text" name="nis" value={formData.nis} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />

              <label><strong>NISN:</strong></label>
              <input type="text" name="nisn" value={formData.nisn} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />

              <label><strong>Jenis Kelamin:</strong></label>
              <input type="text" name="gender" value={formData.gender_id} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />

              <label><strong>Tempat Lahir:</strong></label>
              <input type="text" name="tempat_lahir" value={formData.tempat_lahir} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />

              <label><strong>Tanggal Lahir:</strong></label>
              <input type="date" name="tanggal_lahir" value={formData.tanggal_lahir} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />

              <label><strong>Agama:</strong></label>
              <input type="text" name="agama" value={formData.agama} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />

              <label><strong>Kewarganegaraan:</strong></label>
              <input type="text" name="kewarganegaraan" value={formData.kewarganegaraan} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />

              <label><strong>No. HP:</strong></label>
              <input type="text" name="no_hp" value={formData.no_hp} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />

              <label><strong>Alamat Lengkap:</strong></label>
              <input type="text" name="alamat_lengkap" value={formData.alamat_lengkap} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />

              <label><strong>Kecamatan:</strong></label>
              <input type="text" name="kecamatan" value={formData.kecamatan} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />

              <label><strong>Kota/Kabupaten:</strong></label>
              <input type="text" name="kota_kabupaten" value={formData.kota_kabupaten} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />

              <label><strong>Status Tempat Tinggal:</strong></label>
              <input type="text" name="status_tempat_tinggal" value={formData.status_tempat_tinggal} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />

              <label><strong>Tinggal Dengan:</strong></label>
              <input type="text" name="tinggal_dengan" value={formData.tinggal_dengan} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />

              <label><strong>Anak Ke:</strong></label>
              <input type="text" name="anak_ke" value={formData.anak_ke} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />

              <label><strong>Jumlah Saudara:</strong></label>
              <input type="text" name="jumlah_saudara" value={formData.jumlah_saudara} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />
            </div>

            {/* Parent Information */}
            <div>
              <label><strong>Nama Orang Tua:</strong></label>
              <input type="text" name="nama_orang_tua" value={formData.nama_orang_tua} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />

              <label><strong>Status Orang Tua:</strong></label>
              <input type="text" name="status_orang_tua" value={formData.status_orang_tua} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />

              <label><strong>Tempat Lahir Orang Tua:</strong></label>
              <input type="text" name="tempat_lahir_orang_tua" value={formData.tempat_lahir_orang_tua} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />

              <label><strong>Pendidikan Terakhir:</strong></label>
              <input type="text" name="pendidikan_terakhir" value={formData.pendidikan_terakhir} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />

              <label><strong>Pekerjaan Orang Tua:</strong></label>
              <input type="text" name="pekerjaan_orang_tua" value={formData.pekerjaan_orang_tua} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />

              <label><strong>Perkiraan Penghasilan:</strong></label>
              <input type="text" name="perkiraan_penghasilan" value={formData.perkiraan_penghasilan} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />

              <label><strong>Jumlah Tanggungan:</strong></label>
              <input type="text" name="jumlah_tanggungan" value={formData.jumlah_tanggungan} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />

              <label><strong>Alamat Orang Tua:</strong></label>
              <input type="text" name="alamat_orang_tua" value={formData.alamat_orang_tua} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />

              <label><strong>No. HP Orang Tua:</strong></label>
              <input type="text" name="no_hp_orang_tua" value={formData.no_hp_orang_tua} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />

              <label><strong>Departemen:</strong></label>
              <input type="text" name="department" value={formData.department_id} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />

              <label><strong>Kelas:</strong></label>
              <input type="text" name="classroom" value={formData.classroom_id} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />

              <label><strong>Angkatan:</strong></label>
              <input type="text" name="angkatan" value={formData.angkatan} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />

              <label><strong>Transportasi ke Sekolah:</strong></label>
              <input type="text" name="ke_sekolah_menggunakan" value={formData.ke_sekolah_menggunakan} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />

              <label><strong>Jalur Pendaftaran:</strong></label>
              <input type="text" name="daftar_jalur" value={formData.daftar_jalur} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />

              <label><strong>No Seri Ijazah SMP:</strong></label>
              <input type="text" name="no_seri_ijazah_smp" value={formData.no_seri_ijazah_smp} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />

              {/* File Uploads */}
              <label><strong>Pas Foto:</strong></label>
              <input type="file" name="pas_foto" onChange={handleFileChange} className="w-full mt-1 p-2 border rounded-md" />

              <label><strong>Scan Ijazah SMP:</strong></label>
              <input type="file" name="scan_ijazah_smp" onChange={handleFileChange} className="w-full mt-1 p-2 border rounded-md" />

              <label><strong>Scan Akte Kelahiran:</strong></label>
              <input type="file" name="scan_akte_kelahiran" onChange={handleFileChange} className="w-full mt-1 p-2 border rounded-md" />

              <label><strong>Scan Kartu Keluarga:</strong></label>
              <input type="file" name="scan_kartu_keluarga" onChange={handleFileChange} className="w-full mt-1 p-2 border rounded-md" />
            </div>
          </div>

          <div className="flex justify-end mt-10">
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Tambah Data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudentModal;
