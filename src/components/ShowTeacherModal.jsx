import React from 'react'
import { FaTimes } from 'react-icons/fa';


const ShowTeacherModal = ({ isOpen, onClose, employees }) => {
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
                    <h3 className="text-2xl font-bold tracking-wider text-gray-800">Detail Data Guru</h3>
                </div>

                {/* Teacher Information */}
                <div className="grid grid-cols-2 gap-4 mt-4 text-gray-700">
                    <div>
                        <p><strong>Nama Lengkap:</strong> {employees.nama}</p>
                        <p><strong>NUPTK:</strong> {employees.nuptk}</p>
                        <p><strong>Jenis Kelamin:</strong> {employees.gender.nama}</p>
                        <p><strong>Tempat Lahir:</strong> {employees.tempat_lahir}</p>
                        <p><strong>Tanggal Lahir:</strong> {employees.tanggal_lahir}</p>
                        <p><strong>NIP:</strong> {employees.nip}</p>
                        <p><strong>Status Kepegawaian:</strong> {employees.status_kepegawaian}</p>
                        <p><strong>Jenis PTK:</strong> {employees.jenis_ptk}</p>
                        <p><strong>Agama:</strong> {employees.agama}</p>
                        <p><strong>Alamat Jalan:</strong> {employees.alamat_jalan}</p>
                        <p><strong>RT:</strong> {employees.rt}</p>
                        <p><strong>RW:</strong> {employees.rw}</p>
                        <p><strong>Nama Dusun:</strong> {employees.nama_dusun}</p>
                        <p><strong>Desa/Kelurahan:</strong> {employees.desa_kelurahan}</p>
                      </div>
                      <div>
                        <p><strong>Kecamatan:</strong> {employees.kecamatan}</p>
                        <p><strong>Kode POS:</strong> {employees.rw}</p>
                        <p><strong>Telepon:</strong> {employees.telepon}</p>
                        <p><strong>No HP:</strong> {employees.hp}</p>
                        <p><strong>Email:</strong> {employees.email}</p>
                        <p><strong>Tugas Tambahan:</strong> {employees.tugas_tambahan}</p>
                        <p><strong>SK CPNS:</strong> {employees.sk_cpns}</p>
                        <p><strong>Tanggal CPNS:</strong> {employees.tanggal_cpns}</p>
                        <p><strong>SK Pengangkatan:</strong> {employees.sk_pengangkatan}</p>
                        <p><strong>TMT Pengangkatan:</strong> {employees.tmt_pengangkatan}</p>
                        <p><strong>Lembaga Pengangkatan:</strong> {employees.lembaga_pengangkatan}</p>
                        <p><strong>Pangkat Golongan:</strong> {employees.pangkat_golongan}</p>
                        <p><strong>Pendidikan:</strong> {employees.pendidikan}</p>
                        <p><strong>Gaji:</strong> {employees.gaji}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default ShowTeacherModal
