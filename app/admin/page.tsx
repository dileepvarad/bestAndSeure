"use client";

import { motion } from "framer-motion";
import { Package, MessageSquare, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const stats = [
    { title: "Manage Fleet", icon: Package, href: "/admin/packages", color: "from-blue-500/20 to-blue-500/5", textColor: "text-blue-400" },
    { title: "Customer Reviews", icon: MessageSquare, href: "/admin/reviews", color: "from-green-500/20 to-green-500/5", textColor: "text-green-400" },
    { title: "Gallery", icon: ImageIcon, href: "/admin/gallery", color: "from-purple-500/20 to-purple-500/5", textColor: "text-purple-400" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-playfair font-bold text-white mb-2">Welcome, Admin</h1>
      <p className="text-gray-400 mb-8">Here you can manage the content for Best &amp; Secure Tours &amp; Travels.</p>

      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <Link key={stat.title} href={stat.href}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={`glass rounded-2xl p-6 border border-white/5 hover:border-white/20 transition-all bg-gradient-to-br ${stat.color}`}
            >
              <stat.icon size={32} className={`mb-4 ${stat.textColor}`} />
              <h3 className="text-xl font-semibold text-white">{stat.title}</h3>
              <p className="text-sm text-gray-400 mt-2">Click to manage &rarr;</p>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
