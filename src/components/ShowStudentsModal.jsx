import React from 'react';
import { FaTimes } from 'react-icons/fa';


const ShowStudentsModal = ({ isOpen, onClose, student }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white w-full max-w-3xl p-8 rounded-md shadow-lg max-h-screen overflow-y-auto">
        <div className="flex justify-end">
        <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={20} />
          </button>
        </div>
        <div className="p-6 relative">
            {/* Header */}
            <div className="text-center mb-10">
                <h3 className="text-2xl font-bold tracking-wider text-gray-800">Detail Data Siswa</h3>
            </div>

            {/* Student Photo */}
            <div className="flex justify-center mb-10">
                <div className="w-24 h-32 border-2 border-gray-400 rounded-lg overflow-hidden shadow-md">
                    <img src={student.pas_foto} alt="Student Photo" className="w-full h-full object-cover" />
                </div>
            </div>

            {/* Student Information */}
            <div className="grid grid-cols-2 gap-4 mt-4 text-gray-700">
                <div>
                    <p><strong>Nama Lengkap:</strong> {student.nama_lengkap}</p>
                    <p><strong>Nama Panggilan:</strong> {student.nama_panggilan}</p>
                    <p><strong>NIS:</strong> {student.nis}</p>
                    <p><strong>NISN:</strong> {student.nisn}</p>
                    <p><strong>Jenis Kelamin:</strong> {student.gender.nama}</p>
                    <p><strong>Tempat Lahir:</strong> {student.tempat_lahir}</p>
                    <p><strong>Tanggal Lahir:</strong> {student.tanggal_lahir}</p>
                    <p><strong>Agama:</strong> {student.agama}</p>
                    <p><strong>Kewarganegaraan:</strong> {student.kewarganegaraan}</p>
                    <p><strong>No. HP:</strong> {student.no_hp}</p>
                    <p><strong>Alamat Lengkap:</strong> {student.alamat_lengkap}</p>
                    <p><strong>Kecamatan:</strong> {student.kecamatan}</p>
                    <p><strong>Kota/Kabupaten:</strong> {student.kota_kabupaten}</p>
                    <p><strong>Status Tempat Tinggal:</strong> {student.status_tempat_tinggal}</p>
                    <p><strong>Tinggal Dengan:</strong> {student.tinggal_dengan}</p>
                    <p><strong>Anak Ke:</strong> {student.anak_ke}</p>
                    <p><strong>Jumlah Saudara:</strong> {student.jumlah_saudara}</p>
                    <p><strong>Departemen:</strong> {student.department.nama}</p>
                    <p><strong>Kelas:</strong> {student.classroom.nama}</p>
                    <p><strong>Angkatan:</strong> {student.angkatan}</p>
                    <p><strong>Transportasi ke Sekolah:</strong> {student.ke_sekolah_menggunakan}</p>
                    <p><strong>Jalur Pendaftaran:</strong> {student.daftar_jalur}</p>
                    <p><strong>No Seri Ijazah Smp:</strong> {student.no_seri_ijazah_smp}</p>
                </div>
                <div>
                    <p><strong>Nama Orang Tua:</strong> {student.nama_orang_tua}</p>
                    <p><strong>Status Orang Tua:</strong> {student.status_orang_tua}</p>
                    <p><strong>Tempat Lahir Orang Tua:</strong> {student.tempat_lahir_orang_tua}</p>
                    <p><strong>Pendidikan Terakhir:</strong> {student.pendidikan_terakhir}</p>
                    <p><strong>Pekerjaan Orang Tua:</strong> {student.pekerjaan_orang_tua}</p>
                    <p><strong>Perkiraan Penghasilan:</strong> {student.perkiraan_penghasilan}</p>
                    <p><strong>Jumlah Tanggungan:</strong> {student.jumlah_tanggungan}</p>
                    <p><strong>Alamat Orang Tua:</strong> {student.alamat_orang_tua}</p>
                    <p><strong>No. HP Orang Tua:</strong> {student.no_hp_orang_tua}</p>
                </div>
            </div>

            {/* Student Documents */}
            <div className="mt-16">
                <h4 className="text-lg font-semibold text-gray-800">Dokumen Pendukung</h4>
                <div className="flex justify-between mt-4">
                    <div className="w-24 h-32 border-2 border-gray-400 rounded-lg overflow-hidden shadow-md">
                        <img src={student.scan_ijazah_smp} alt="scan ijazah smp" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-24 h-32 border-2 border-gray-400 rounded-lg overflow-hidden shadow-md">
                        <img src={student.scan_akte_kelahiran} alt="scan akte kelahiran" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-24 h-32 border-2 border-gray-400 rounded-lg overflow-hidden shadow-md">
                        <img src={student.scan_kartu_keluarga} alt="scan kartu Keluarga" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </div>
  
      </div>
    </div>
  );
};

export default ShowStudentsModal;
