import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import axios from '../api/Index';
import Cookies from 'js-cookie';

const AddTeacherModal = ({ isOpen, onClose, fetchData }) => {
  const [formData, setFormData] = useState({
    nama: '',
    nuptk: '',
    gender_id: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    nip: '',
    status_kepegawaian: '',
    employee_type3_id: '',
    employee_type2_id: '',
    agama: '',
    alamat_jalan: '',
    rt: '',
    rw: '',
    nama_dusun: '',
    desa_kelurahan: '',
    kecamatan: '',
    kode_pos: '',
    telepon: '',
    hp: '',
    email: '',
    tugas_tambahan: '',
    sk: '',
    tanggal_cpns: '',
    sk_pengangkatan: '',
    tmt_pengangkatan: '',
    lembaga_pengangkatan: '',
    pangkat_golongan: '',
    pendidikan: '',
    gaji: '',
    employee_type_id: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
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

    const teacherData = new FormData();
    Object.keys(formData).forEach((key) => {
      teacherData.append(key, formData[key]);
    });

    try {
      const response = await axios.post('/api/admin/gurustaff', teacherData, config);
      console.log('Response:', response.data);
      fetchData();
      onClose();
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
      } else {
        console.error('Error adding teacher:', error.message);
      }
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
            <h3 className="text-2xl font-bold tracking-wider text-gray-800">Tambah Data Guru</h3>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4 text-gray-700">
            {/* Informasi Guru */}
            <div>
              <label><strong>Nama lengkap:</strong></label>
              <input type="text" name="nama" value={formData.nama} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md"  />

              <label><strong>NIP:</strong></label>
              <input type="number" name="nip" value={formData.nip} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md"  />

              <label><strong>NUPTK:</strong></label>
              <input type="number" name="nuptk" value={formData.nuptk} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md"  />

              <label><strong>Jenis PTK:</strong></label>
              <select name="employee_type3_id" value={formData.employee_type3_id} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" >
                <option value="">Pilih Jenis PTK</option>
                <option value="1">PNS</option>
                <option value="2">P3K</option>
                <option value="3">Honorer</option>
              </select>

              <label><strong>Jenis Kelamin:</strong></label>
              <select name="gender_id" value={formData.gender_id} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" >
                <option value="">Pilih Jenis Kelamin</option>
                <option value="1">Laki-laki</option>
                <option value="2">Perempuan</option>
              </select>

              <label><strong>Agama:</strong></label>
              <input type="text" name="agama" value={formData.agama} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md"  />

              <label><strong>Tempat Lahir:</strong></label>
              <textarea type="text" name="tempat_lahir" value={formData.tempat_lahir} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md"  />

              <label><strong>Tanggal Lahir:</strong></label>
              <input type="date" name="tanggal_lahir" value={formData.tanggal_lahir} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md"  />

              <label><strong>Alamat Jalan:</strong></label>
              <textarea type="text" name="alamat_jalan" value={formData.alamat_jalan} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md"  />

              <label><strong>RT:</strong></label>
              <input type="text" name="rt" value={formData.rt} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md"  />

              <label><strong>RW:</strong></label>
              <input type="text" name="rw" value={formData.rw} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md"  />

              <label><strong>Nama Dusun:</strong></label>
              <input type="text" name="nama_dusun" value={formData.nama_dusun} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md"  />

              <label><strong>Desa/Kelurahan:</strong></label>
              <input type="text" name="desa_kelurahan" value={formData.desa_kelurahan} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md"  />

              <label><strong>Kecamatan:</strong></label>
              <input type="text" name="kecamatan" value={formData.kecamatan} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md"  />
            </div>

            {/* Informasi Tambahan Guru */}
            <div>

            <label><strong>Status Kepegawaian:</strong></label>
              <input type="text" name="status_kepegawaian" value={formData.status_kepegawaian} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md"  />

              <label><strong>Kode Pos:</strong></label>
              <input type="number" name="kode_pos" value={formData.kode_pos} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md"  />

              <label><strong>Telepon:</strong></label>
              <input type="number" name="telepon" value={formData.telepon} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md"  />

              <label><strong>HP:</strong></label>
              <input type="number" name="hp" value={formData.hp} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md"  />

              <label><strong>Email:</strong></label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md"  />

              <label><strong>Tugas Tambahan:</strong></label>
              <input type="text" name="tugas_tambahan" value={formData.tugas_tambahan} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />

              <label><strong>SK:</strong></label>
              <input type="text" name="sk" value={formData.sk} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md"  />

              <label><strong>Tanggal CPNS:</strong></label>
              <input type="date" name="tanggal_cpns" value={formData.tanggal_cpns} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md"  />

              <label><strong>SK Pengangkatan:</strong></label>
              <input type="text" name="sk_pengangkatan" value={formData.sk_pengangkatan} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md"  />

              <label><strong>TMT Pengangkatan:</strong></label>
              <input type="date" name="tmt_pengangkatan" value={formData.tmt_pengangkatan} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md"  />

              <label><strong>Lembaga Pengangkatan:</strong></label>
              <input type="text" name="lembaga_pengangkatan" value={formData.lembaga_pengangkatan} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md"  />

              <label><strong>Pangkat/Golongan:</strong></label>
              <input type="text" name="pangkat_golongan" value={formData.pangkat_golongan} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md"  />

              <label><strong>Pendidikan:</strong></label>
              <input type="text" name="pendidikan" value={formData.pendidikan} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md"  />

              <label><strong>Gaji Pokok:</strong></label>
              <input type="number" name="gaji" value={formData.gaji} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md"  />

              <label><strong>Jenis Pegawai:</strong></label>
              <select name="employee_type_id" value={formData.employee_type_id} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" >
                <option value="">Pilih Jenis Pegawai</option>
                <option value="1">Guru Produktif</option>
                <option value="2">Guru Non Produktif</option>
                <option value="3">Staff</option>
              </select>
              <label><strong>Jabatan:</strong></label>
              <select name="employee_type2_id" value={formData.employee_type2_id} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" >
                <option value="">Pilih Jabatan</option>
                <option value="1">Guru Umum</option>
                <option value="2">Guru Kejuruan</option>
                <option value="3">TU</option>
                <option value="4">Toolman</option>
                <option value="5">Satpam</option>
                <option value="6">Perpus</option>
                <option value="7">OB</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTeacherModal;
